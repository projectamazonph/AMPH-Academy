'use client';
import { Icon } from '@/components/icons';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { getUsers, deleteUser, updateUserRole, type AdminUser } from '@/app/actions/admin/users';
import { useSession } from 'next-auth/react';

const roleColors: Record<string, string> = {
  ADMIN: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  INSTRUCTOR: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  STUDENT: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const pageSize = 15;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await getUsers();
    if (res.success) setUsers(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const filtered = users
    .filter(u =>
      !search || u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortDir === 'desc'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const currentUserId = (session?.user as { id?: string })?.id;

  async function handleDelete(userId: string, name: string) {
    if (!confirm(`Delete user "${name || 'Unknown'}"? This cannot be undone.`)) return;
    const res = await deleteUser(userId);
    if (res.success) fetchUsers();
    else alert(res.error || 'Failed to delete');
  }

  async function handleRole(userId: string, currentRole: string) {
    const roles = ['STUDENT', 'INSTRUCTOR', 'ADMIN'];
    const idx = roles.indexOf(currentRole);
    const nextRole = roles[(idx + 1) % roles.length];
    const res = await updateUserRole(userId, nextRole);
    if (res.success) fetchUsers();
    else alert(res.error || 'Failed to update role');
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Users className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-muted-foreground">{users.length} total users</p>
        </div>
      </div>

      {/* MagnifyingGlass */}
      <div className="relative max-w-sm">
        <Icon name="magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="MagnifyingGlass by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        />
      </div>

      {/* Users table */}
      <Card className="border-border/40 bg-card/40 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Icon name="spinner" className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : paged.length === 0 ? (
          <CardContent className="py-16 text-center text-muted-foreground">
            <Users className="h-8 w-8 mx-auto mb-3 opacity-50" />
            {search ? 'No users match your search.' : 'No users yet.'}
          </CardContent>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">User</th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium hidden md:table-cell">Email</th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">Role</th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium hidden sm:table-cell">
                    <button onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                      Joined <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium hidden lg:table-cell">XP</th>
                  <th className="text-right p-3 text-xs text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((user) => (
                  <tr key={user.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {(user.name || user.email).charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium truncate max-w-[150px]">{user.name || '—'}</span>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell truncate max-w-[200px]">
                      {user.email}
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className={cn('text-[10px] px-2 py-0.5', roleColors[user.role] || '')}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground hidden sm:table-cell text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 hidden lg:table-cell font-mono text-xs">{user.xp.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost" size="icon" className="h-7 w-7"
                          onClick={() => handleRole(user.id, user.role)}
                          disabled={user.id === currentUserId}
                          title={`Change role (currently ${user.role})`}
                        >
                          <UserCog className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost" size="icon" className="h-7 w-7 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                          onClick={() => handleDelete(user.id, user.name || user.email)}
                          disabled={user.id === currentUserId}
                          title="Delete user"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Page {page + 1} of {totalPages}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}>
              <Icon name="caret-left" className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}>
              <Icon name="caret-right" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
