# STORY-017: LiveClass Dashboard Widget

**Sprint:** 4 | **Points:** 1 | **Priority:** Nice to Have
**Epic:** Live Classes
**Dependencies:** STORY-015
**Status:** Pending

---

## Description

Add an upcoming live classes widget to the main Dashboard tab (the overview/home view in the student dashboard). Shows the next 2-3 upcoming classes with a countdown badge and quick-register CTA.

## Acceptance Criteria

- [x] Widget appears on the main Dashboard tab showing next 2-3 upcoming classes
- [x] Each item shows: title, course name, date/time with relative countdown (e.g., "in 2 days", "Tomorrow at 10:00 AM")
- [x] Register button / "Registered" status inline
- [x] Clicking a class navigates to the full Live Classes tab
- [x] Empty state when no upcoming classes are scheduled
- [x] Matches the widget pattern used by other dashboard components

## Technical Notes

- File: `project/components/amph/dashboard.tsx` — this is the Dashboard component
- Import `getUpcomingClasses` from the live-classes module
- Small scope: reuse STORY-015's action functions — no new server actions needed
- For relative time: use a simple helper `getRelativeTime(date: Date): string` that returns "Today", "Tomorrow", "In X days"
- Keep compact — this is an overview widget, not the full schedule

```tsx
// Example widget structure
function LiveClassesWidget({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [classes, setClasses] = useState<LiveClassSummary[]>([]);
  
  useEffect(() => {
    getUpcomingClasses().then(setClasses);
  }, []);

  if (classes.length === 0) return null; // No upcoming classes

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Upcoming Live Classes</CardTitle>
      </CardHeader>
      <CardContent>
        {classes.slice(0, 3).map(lc => (
          <div key={lc.id}>
            <span>{lc.title}</span>
            <span>{getRelativeTime(lc.scheduledAt)}</span>
          </div>
        ))}
        <Button onClick={() => onNavigate('live-classes')}>
          View Full Schedule
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Files Changed

- `project/components/amph/dashboard.tsx` — add LiveClassesWidget component and render it
