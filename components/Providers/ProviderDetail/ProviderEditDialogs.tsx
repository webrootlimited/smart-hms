import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputCls =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]";
const labelCls = "block text-xs font-semibold text-[#334155] mb-1";

function Footer({ onClose }: { onClose: () => void }) {
  return (
    <DialogFooter>
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
      >
        Cancel
      </button>
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer"
      >
        Save Changes
      </button>
    </DialogFooter>
  );
}

// ── Basic Information ──
export function EditBasicInfoDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: { fullName: string; dateOfBirth: string; gender: string; employeeId: string };
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Basic Information</DialogTitle>
          <DialogDescription>Update provider personal details</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>First Name</label>
              <input type="text" defaultValue={data.fullName.split(" ").slice(0, -1).join(" ")} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input type="text" defaultValue={data.fullName.split(" ").pop()} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Date of Birth</label>
            <input type="text" defaultValue={data.dateOfBirth} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Gender</label>
            <Select defaultValue={data.gender.toLowerCase()}>
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className={labelCls}>Employee ID</label>
            <input type="text" defaultValue={data.employeeId} className={inputCls} />
          </div>
        </div>
        <Footer onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

// ── Contact Information ──
export function EditContactDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: { email: string; phone: string; emergencyContact: string; address: string };
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
          <DialogDescription>Update contact details</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Email Address</label>
            <input type="email" defaultValue={data.email} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Phone Number</label>
            <input type="tel" defaultValue={data.phone} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Emergency Contact</label>
            <input type="tel" defaultValue={data.emergencyContact} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Home Address</label>
            <textarea defaultValue={data.address} rows={2} className={inputCls + " resize-none"} />
          </div>
        </div>
        <Footer onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

// ── Professional Bio ──
export function EditBioDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: { bio: string; specializations: string[] };
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Professional Bio</DialogTitle>
          <DialogDescription>Update bio and specializations</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Bio</label>
            <textarea defaultValue={data.bio} rows={4} className={inputCls + " resize-none"} />
          </div>
          <div>
            <label className={labelCls}>Specializations (comma-separated)</label>
            <input type="text" defaultValue={data.specializations.join(", ")} className={inputCls} />
          </div>
        </div>
        <Footer onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

// ── Schedule ──
export function EditScheduleDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: { days: { day: string; from: string; to: string; active: boolean }[]; lunchBreak: string; bufferTime: string };
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
          <DialogDescription>Update weekly working hours</DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto">
          {data.days.map((d) => (
            <div key={d.day} className="flex items-center gap-2">
              <span className="w-24 text-sm font-medium text-[#101828] shrink-0">{d.day}</span>
              <input type="time" defaultValue={d.from} className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg" />
              <span className="text-xs text-[#6A7282]">to</span>
              <input type="time" defaultValue={d.to} className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg" />
            </div>
          ))}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            <div>
              <label className={labelCls}>Lunch Break</label>
              <input type="text" defaultValue={data.lunchBreak} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Buffer Time</label>
              <input type="text" defaultValue={data.bufferTime} className={inputCls} />
            </div>
          </div>
        </div>
        <Footer onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

// ── Location ──
export function EditLocationDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: { name: string; room: string; address: string; workingDays: string[] } | null;
}) {
  if (!data) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
          <DialogDescription>Update location details for {data.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Location Name</label>
            <input type="text" defaultValue={data.name} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Room / Suite</label>
            <input type="text" defaultValue={data.room} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Address</label>
            <input type="text" defaultValue={data.address} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Working Days (comma-separated)</label>
            <input type="text" defaultValue={data.workingDays.join(", ")} className={inputCls} />
          </div>
        </div>
        <Footer onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

// ── Telehealth Settings ──
export function EditTelehealthDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: { platform: string; maxDailyVirtual: number; avgSessionDuration: string };
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Telehealth Settings</DialogTitle>
          <DialogDescription>Update virtual appointment configuration</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Platform</label>
            <input type="text" defaultValue={data.platform} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Max Daily Virtual Visits</label>
            <input type="number" defaultValue={data.maxDailyVirtual} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Avg Session Duration</label>
            <input type="text" defaultValue={data.avgSessionDuration} className={inputCls} />
          </div>
        </div>
        <Footer onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

// ── Delete Confirmation ──
export function DeleteConfirmDialog({
  open,
  onClose,
  title,
  description,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold bg-[#EF4444] text-white rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Edit Appointment Rules ──
export function EditAppointmentSettingsDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: { duration: string; buffer: string; maxDaily: string; advanceWindow: string; sameDayBooking: boolean };
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Appointment Settings</DialogTitle>
          <DialogDescription>Update appointment configuration</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Appointment Duration</label>
            <input type="text" defaultValue={data.duration} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Buffer Between Appointments</label>
            <input type="text" defaultValue={data.buffer} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Max Daily Appointments</label>
            <input type="text" defaultValue={data.maxDaily} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Advance Booking Window</label>
            <input type="text" defaultValue={data.advanceWindow} className={inputCls} />
          </div>
          <div className="flex items-center justify-between">
            <label className={labelCls + " mb-0"}>Same-Day Booking</label>
            <Select defaultValue={data.sameDayBooking ? "enabled" : "disabled"}>
              <SelectTrigger className="w-32 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Footer onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export function EditPoliciesDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: { onlineBooking: boolean; autoConfirmation: boolean; cancellationWindow: string; noShowFee: string };
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Policies</DialogTitle>
          <DialogDescription>Update booking policies</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className={labelCls + " mb-0"}>Online Booking</label>
            <Select defaultValue={data.onlineBooking ? "on" : "off"}>
              <SelectTrigger className="w-24 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on">ON</SelectItem>
                <SelectItem value="off">OFF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label className={labelCls + " mb-0"}>Auto-Confirmation</label>
            <Select defaultValue={data.autoConfirmation ? "on" : "off"}>
              <SelectTrigger className="w-24 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on">ON</SelectItem>
                <SelectItem value="off">OFF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className={labelCls}>Cancellation Window</label>
            <input type="text" defaultValue={data.cancellationWindow} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>No-Show Fee</label>
            <input type="text" defaultValue={data.noShowFee} className={inputCls} />
          </div>
        </div>
        <Footer onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

// ── Assistant ──
export function EditAssistantDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: { name: string; role: string; email: string; phone: string } | null;
}) {
  if (!data) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Assistant</DialogTitle>
          <DialogDescription>Update details for {data.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Full Name</label>
            <input type="text" defaultValue={data.name} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Role</label>
            <input type="text" defaultValue={data.role} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" defaultValue={data.email} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input type="tel" defaultValue={data.phone} className={inputCls} />
          </div>
        </div>
        <Footer onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
