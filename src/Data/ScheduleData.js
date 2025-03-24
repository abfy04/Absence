export const scheduleData =[
        {
          "id": 1,
          "teacher_name": "John Doe",
          "group_name": "DEV101",
          "room_name": "Salle 1",
          "start_time": "08:30",
          "end_time": "11:00",
          "day_of_week": "Monday",
          "status": "active",
          "is_temporary": false,
          "start_date": null,
          "end_date": null,
          "original_group_name": null,
          "created_at": "2025-03-01 08:00:00",
          "updated_at": "2025-03-01 08:00:00"
        },
        {
          "id": 2,
          "teacher_name": "John Doe",
          "group_name": "GS201",
          "room_name": "Salle 4",
          "start_time": "11:00",
          "end_time": "13:30",
          "day_of_week": "Tuesday",
          "status": "active",
          "is_temporary": false,
          "start_date": null,
          "end_date": null,
          "original_group_name": null,
          "created_at": "2025-03-01 10:00:00",
          "updated_at": "2025-03-04 10:00:00"
        },
        {
          "id": 3,
          "teacher_name": "John Doe",
          "group_name": "DEVOWFS201",
          "room_name": "Info",
          "start_time": "13:30",
          "end_time": "16:00",
          "day_of_week": "Wednesday",
          "status": "active",
          "is_temporary": false,
          "start_date": null,
          "end_date": null,
          "original_group_name": null,
          "created_at": "2025-03-01 14:00:00",
          "updated_at": "2025-03-02 14:00:00"
        },
        {
          "id": 4,
          "teacher_name": "John Doe",
          "group_name": "GC103",
          "room_name": "Atelier RVA",
          "start_time": "16:00",
          "end_time": "18:30",
          "day_of_week": "Friday",
          "status": "active",
          "is_temporary": false,
          "start_date": null,
          "end_date": null,
          "original_group_name": null,
          "created_at": "2025-03-01 16:00:00",
          "updated_at": "2025-03-01 16:00:00"
        },
        {
          "id": 5,
          "teacher_name": "John Doe",
          "group_name": "AI201",
          "room_name": "Atelier TFI",
          "start_time": "19:30",
          "end_time": "21:30",
          "day_of_week": "Saturday",
          "status": "active",
          "is_temporary": false,
          "start_date": null,
          "end_date": null,
          "original_group_name": null,
          "created_at": "2025-03-01 19:30:00",
          "updated_at": "2025-03-08 19:30:00"
        }
      ]

export const teacherScheduleData = [
        {idSession:1, day: "Saturday", start: "8:30", end: "11:30", group: "Dev101",idg: 1, room: "Atelier PVB" },
        {idSession:2, day: "Monday", start: "13:30", end: "16:00", group: "Dev101",idg: 1, room: "INFO" },
        {idSession:3, day: "Monday", start: "16:00", end: "18:30", group: "Rizo201",idg: 2, room: "INFO" },
        {idSession:4, day: "Tuesday", start: "13:30", end: "16:00", group: "civil101",idg: 4, room: "Atelier PVB" },
        {idSession:5, day: "Wednesday", start: "8:30", end: "11:30", group: "Dev101",idg: 1, room: "Atelier PVB" },
        {idSession:6, day: "Wednesday", start: "13:30", end: "16:00", group: "civil101",idg: 4, room: "Atelier PVB" },
        {idSession:7, day: "Wednesday", start: "16:00", end: "18:30", group: "Rizo201",idg: 2, room: "Atelier PVB" },
        {idSession:8, day: "Thursday", start: "16:00", end: "18:30", group: "AA201",idg: 5, room: "Atelier PVB" },
        {idSession:9, day: "Thursday", start: "8:30", end: "11:30", group: "Gestion301",idg: 3, room: "Atelier PVB" },
        {idSession:10, day: "Friday", start: "19:30", end: "21:30", group: "GCF301",idg: 7, room: "Salle 4" },
        {idSession:11, day: "Friday", start: "8:30", end: "11:00", group: "Dev101",idg: 1, room: "Atelier PVB" },
        {idSession:12, day: "Friday", start: "11:00", end: "13:30", group: "Rizo201",idg: 2, room: "Atelier PVB" },
        
        {idSession:13, day: "Monday", start: "8:30", end: "11:00", group: "Gestion301",idg: 3, room: "TFI" },
];

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const sessions = [
    {
        start : '08:30',
        end:'11:00'
    },
    {
        start : '11:00',
        end:'13:30'
    },
    {
        start : '13:30',
        end:'16:00'
    },
    {
        start : '16:00',
        end:'18:30'
    },
    {
        start : '19:30',
        end:'21:30'
    },

];

export const initialValues = {
    id: '',
    teacher_name: 'John Doe',
    group_name: '',
    room_name: '',
    start_time: '',
    end_time: '',
    day_of_week: '',
    status: 'active',
    is_temporary: false,
    start_date: null,
    end_date: null,
    original_group_name: null,
    created_at: '',
    updated_at: '',
};