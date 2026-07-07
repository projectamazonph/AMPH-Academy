'use client'
import { Calendar, Globe, Layers, Pencil, Plus, SquareArrowOutUpRight, Trash2, Users, Video } from '@/components/icons';
;
import { Icon } from '@/components/icons';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { getCourses, type AdminCourse } from '@/app/actions/admin/courses';
import { getAdminBadges, type AdminBadge } from '@/app/actions/admin/badges';
import {
  getLiveClasses, createLiveClass, updateLiveClass, deleteLiveClass, toggleLiveClassPublish,
  type AdminLiveClass, type CreateLiveClassInput, type UpdateLiveClassInput,
} from '@/app/actions/admin/live-classes';
import { useToast } from '@/hooks/use-toast';

const tierColors: Record<string, string> = {
  free: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  foundations: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  accelerated: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  ultimate: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

// ============================================================================
// COURSES TAB
// ============================================================================

function CoursesTab() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCourses().then(r => { if (r.success) setCourses(r.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter(c =>
    !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.slug.includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-16"><Icon name="spinner" className="h-5 w-5 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Icon name="magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="MagnifyingGlass courses..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border/40 bg-card/40">
          <CardContent className="py-16 text-center text-muted-foreground">
            <Icon name="book-open" className="h-8 w-8 mx-auto mb-3 opacity-50" />
            {search ? 'No courses match your search.' : 'No courses yet.'}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((course) => (
            <Card key={course.id} className="border-border/40 bg-card/40 hover:bg-card/60 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{course.title}</h3>
                      {course.isPublished
                        ? <Globe className="h-3.5 w-3.5 text-emerald-400" />
                        : <Icon name="lock" className="h-3.5 w-3.5 text-rose-400" />
                      }
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{course.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <Badge variant="outline" className={cn('text-[10px]', (course.tier ? tierColors[course.tier] : '') || '')}>
                        {course.tier}
                      </Badge>
                      <span>{course.difficulty}</span>
                      <span className="flex items-center gap-1"><Layers className="h-3 w-3" />{course.moduleCount} modules</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.enrollmentCount} enrolled</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// BADGES TAB
// ============================================================================

function BadgesTab() {
  const [badges, setBadges] = useState<AdminBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminBadges().then(r => { if (r.success) setBadges(r.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-16"><Icon name="spinner" className="h-5 w-5 animate-spin text-muted-foreground" /></div>;

  return (
    <>
      {badges.length === 0 ? (
        <Card className="border-border/40 bg-card/40">
          <CardContent className="py-16 text-center text-muted-foreground">
            No badges created yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {badges.map((badge) => (
            <Card key={badge.id} className="border-border/40 bg-card/40">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm">{badge.title}</h3>
                  <Badge variant="outline" className="text-[10px]">{badge.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/20">
                  <span>{badge.xpReward} XP</span>
                  <span>Awarded {badge.awarded} times</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

// ============================================================================
// LIVE CLASSES TAB
// ============================================================================

function LiveClassesTab() {
  const { toast } = useToast();
  const [liveClasses, setLiveClasses] = useState<AdminLiveClass[]>([]);
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCourseId, setFormCourseId] = useState('');
  const [formInstructor, setFormInstructor] = useState('Ryan Dabao');
  const [formScheduledAt, setFormScheduledAt] = useState('');
  const [formDuration, setFormDuration] = useState('60');
  const [formMeetingUrl, setFormMeetingUrl] = useState('');
  const [formMaxAttendees, setFormMaxAttendees] = useState('50');

  const loadData = async () => {
    setLoading(true);
    const [lcResult, coursesResult] = await Promise.all([
      getLiveClasses(),
      getCourses(),
    ]);
    if (lcResult.success) setLiveClasses(lcResult.data);
    if (coursesResult.success) setCourses(coursesResult.data as AdminCourse[]);
    setLoading(false);
  };

  useEffect(() => { queueMicrotask(loadData); }, []);

  // Funnel and search
  const now = new Date();
  const filtered = liveClasses.filter(lc => {
    const isUpcoming = new Date(lc.scheduledAt) >= now;
    if (filter === 'upcoming' && !isUpcoming) return false;
    if (filter === 'past' && isUpcoming) return false;
    if (search && !lc.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Open create modal
  const openCreate = () => {
    setEditId(null);
    setFormTitle('');
    setFormDescription('');
    setFormCourseId('');
    setFormInstructor('Ryan Dabao');
    setFormScheduledAt('');
    setFormDuration('60');
    setFormMeetingUrl('');
    setFormMaxAttendees('50');
    setShowModal(true);
  };

  // Open edit modal
  const openEdit = (lc: AdminLiveClass) => {
    setEditId(lc.id);
    setFormTitle(lc.title);
    setFormDescription(lc.description);
    setFormCourseId(lc.courseId);
    setFormInstructor(lc.instructorName);
    setFormScheduledAt(toDatetimeLocal(lc.scheduledAt));
    setFormDuration(String(lc.durationMinutes));
    setFormMeetingUrl(lc.meetingUrl || '');
    setFormMaxAttendees(String(lc.maxAttendees));
    setShowModal(true);
  };

  const toDatetimeLocal = (date: Date) => {
    const d = new Date(date);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  // Save (create or update)
  const handleSave = async () => {
    if (!formTitle.trim() || !formCourseId || !formScheduledAt) {
      toast({ title: 'Validation error', description: 'Title, Course, and Date/Time are required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    const payload: CreateLiveClassInput | UpdateLiveClassInput = {
      title: formTitle.trim(),
      description: formDescription,
      courseId: formCourseId,
      scheduledAt: new Date(formScheduledAt).toISOString(),
      instructorName: formInstructor,
      durationMinutes: parseInt(formDuration) || 60,
      meetingUrl: formMeetingUrl || undefined,
      maxAttendees: parseInt(formMaxAttendees) || 50,
    };

    const result = editId
      ? await updateLiveClass(editId, payload as UpdateLiveClassInput)
      : await createLiveClass(payload as CreateLiveClassInput);

    setSaving(false);

    if (result.success) {
      toast({ title: editId ? 'Updated' : 'Created', description: `Live class ${editId ? 'updated' : 'created'} successfully.` });
      setShowModal(false);
      loadData();
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setSaving(true);
    const result = await deleteLiveClass(deleteConfirm);
    setSaving(false);
    setDeleteConfirm(null);
    if (result.success) {
      toast({ title: 'Deleted', description: 'Live class deleted.' });
      loadData();
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  };

  // Toggle publish
  const handleTogglePublish = async (id: string) => {
    const result = await toggleLiveClassPublish(id);
    if (result.success) {
      toast({ title: result.data.isPublished ? 'Published' : 'Unpublished', description: `Live class is now ${result.data.isPublished ? 'live' : 'draft'}.` });
      loadData();
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  };

  const spotsLeft = (lc: AdminLiveClass) => lc.maxAttendees - lc.registrationCount;
  const isFull = (lc: AdminLiveClass) => lc.registrationCount >= lc.maxAttendees;

  const formatDate = (d: Date) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (d: Date) => {
    const date = new Date(d);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  if (loading) return <div className="flex justify-center py-16"><Icon name="spinner" className="h-5 w-5 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Upcoming/Past filter */}
          <div className="flex gap-1 p-0.5 rounded-lg bg-muted/30 border border-border/20">
            <button onClick={() => setFilter('upcoming')}
              className={cn('px-3 py-1 text-xs rounded-md transition-colors',
                filter === 'upcoming' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}>
              Upcoming
            </button>
            <button onClick={() => setFilter('past')}
              className={cn('px-3 py-1 text-xs rounded-md transition-colors',
                filter === 'past' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}>
              Past
            </button>
          </div>
          <div className="relative max-w-[200px]">
            <Icon name="magnifying-glass" className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input className="pl-8 h-8 text-xs" placeholder="MagnifyingGlass..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <Button size="sm" onClick={openCreate} className="h-8">
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Create Live Class
        </Button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="border-border/40 bg-card/40">
          <CardContent className="py-16 text-center text-muted-foreground">
            <Video className="h-8 w-8 mx-auto mb-3 opacity-50" />
            {search ? 'No live classes match your search.' : `No ${filter} live classes.`}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((lc) => (
            <Card key={lc.id} className="border-border/40 bg-card/40 hover:bg-card/60 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    {/* Title + Status */}
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{lc.title}</h3>
                      <Badge variant="outline" className={cn(
                        'text-[10px]',
                        lc.isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-muted text-muted-foreground border-border/30'
                      )}>
                        {lc.isPublished ? 'Live' : 'Draft'}
                      </Badge>
                      {isFull(lc) && (
                        <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-400 border-rose-500/20">
                          Full
                        </Badge>
                      )}
                    </div>

                    {/* Details row */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap mt-1">
                      <span className="flex items-center gap-1"><Icon name="book-open" className="h-3 w-3" />{lc.courseTitle}</span>
                      <span className="flex items-center gap-1"><Icon name="user" className="h-3 w-3" />{lc.instructorName}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(lc.scheduledAt)}</span>
                      <span className="flex items-center gap-1"><Icon name="clock" className="h-3 w-3" />{formatTime(lc.scheduledAt)}</span>
                      <span className="flex items-center gap-1"><Icon name="clock" className="h-3 w-3" />{lc.durationMinutes} min</span>
                      <span className={cn(
                        'flex items-center gap-1',
                        isFull(lc) ? 'text-rose-400' : spotsLeft(lc) <= 5 ? 'text-amber-400' : ''
                      )}>
                        <Users className="h-3 w-3" />
                        {lc.registrationCount}/{lc.maxAttendees} spots
                      </span>
                    </div>

                    {/* Meeting URL */}
                    {lc.meetingUrl && (
                      <a href={lc.meetingUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 mt-1.5">
                        <SquareArrowOutUpRight className="h-3 w-3" />
                        Meeting link
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleTogglePublish(lc.id)} title={lc.isPublished ? 'Unpublish' : 'Publish'}>
                      {lc.isPublished ? <Icon name="x" className="h-3.5 w-3.5 text-muted-foreground" /> : <Icon name="check" className="h-3.5 w-3.5 text-emerald-400" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(lc)} title="Edit">
                      <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDeleteConfirm(lc.id)} title="Delete">
                      <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto rounded-xl border border-border/40 bg-card/80 backdrop-blur-2xl shadow-2xl"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{editId ? 'Edit Live Class' : 'Create Live Class'}</h2>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowModal(false)}>
                  <Icon name="x" className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Course selector */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Course *</Label>
                  <Select value={formCourseId} onValueChange={setFormCourseId}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Title *</Label>
                  <Input className="h-9 text-sm" value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="e.g. Advanced PPC Strategy Session" />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Description</Label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-lg border border-border/40 bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/30"
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    placeholder="Brief description of the live class..."
                  />
                </div>

                {/* Instructor */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Instructor</Label>
                  <Input className="h-9 text-sm" value={formInstructor} onChange={e => setFormInstructor(e.target.value)} />
                </div>

                {/* Date/Time */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Date & Time *</Label>
                  <Input className="h-9 text-sm" type="datetime-local" value={formScheduledAt} onChange={e => setFormScheduledAt(e.target.value)} />
                </div>

                {/* Duration + Max Attendees row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Duration (min)</Label>
                    <Input className="h-9 text-sm" type="number" min={15} value={formDuration} onChange={e => setFormDuration(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Max Attendees</Label>
                    <Input className="h-9 text-sm" type="number" min={1} value={formMaxAttendees} onChange={e => setFormMaxAttendees(e.target.value)} />
                  </div>
                </div>

                {/* Meeting URL */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Meeting URL</Label>
                  <Input className="h-9 text-sm" value={formMeetingUrl} onChange={e => setFormMeetingUrl(e.target.value)} placeholder="https://zoom.us/j/..." />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-border/20">
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  {saving ? <Icon name="spinner" className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
                  {editId ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-sm mx-4 rounded-xl border border-border/40 bg-card/80 backdrop-blur-2xl shadow-2xl p-5"
          >
            <h2 className="text-lg font-semibold mb-2">Delete Live Class</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete this live class? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button size="sm" variant="destructive" onClick={handleDelete} disabled={saving}>
                {saving ? <Icon name="spinner" className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AdminContentPage() {
  const [tab, setTab] = useState<'courses' | 'badges' | 'live-classes'>('courses');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <Icon name="book-open" className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-sm text-muted-foreground">Courses, modules, badges, and live classes</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/30 border border-border/20 w-fit flex-wrap">
        <button onClick={() => setTab('courses')}
          className={cn('px-4 py-1.5 text-sm rounded-lg transition-colors',
            tab === 'courses' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}>
          Courses
        </button>
        <button onClick={() => setTab('badges')}
          className={cn('px-4 py-1.5 text-sm rounded-lg transition-colors',
            tab === 'badges' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}>
          Badges
        </button>
        <button onClick={() => setTab('live-classes')}
          className={cn('px-4 py-1.5 text-sm rounded-lg transition-colors',
            tab === 'live-classes' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}>
          Live Classes
        </button>
      </div>

      {tab === 'courses' ? <CoursesTab /> : tab === 'badges' ? <BadgesTab /> : <LiveClassesTab />}
    </motion.div>
  );
}
