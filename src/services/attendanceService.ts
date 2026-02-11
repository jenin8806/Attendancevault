import { createClient } from "@/utils/supabase/client";
import { AttendanceStatus, ClassSession } from "@/types";
import { format } from "date-fns";

export async function saveAttendance(session: ClassSession, status: AttendanceStatus) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
        .from('attendance_records')
        .upsert({
            user_id: user.id,
            session_id: session.id,
            status: status,
            date: format(new Date(session.date), "yyyy-MM-dd"),
            subject_id: session.subjectId,
            session_type: session.sessionType
        }, {
            onConflict: 'user_id,date,subject_id,session_type'
        });

    if (error) {
        console.error("Error saving attendance:", error);
    }
}

export async function fetchAttendance() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('attendance_records')
        .select('*');

    if (error) {
        console.error("Error fetching attendance:", error);
        return [];
    }

    return data;
}
