export type DemoTherapist = {
  id: string;
  name: string;
  email: string;
  location: string;
  specialization: string;
  availability: string;
  sessionType: string;
};

export const demoTherapists: DemoTherapist[] = [
  {
    id: "1",
    name: "Dr. Ananya Sharma",
    email: "ananya.sharma@mindcare.in",
    location: "Mumbai, Maharashtra",
    specialization: "Anxiety",
    availability: "Weekdays",
    sessionType: "Online",
  },
  {
    id: "2",
    name: "Dr. Rohan Mehta",
    email: "rohan.mehta@healingroots.in",
    location: "Delhi, NCR",
    specialization: "Depression",
    availability: "Evenings",
    sessionType: "In-Person",
  },
  {
    id: "3",
    name: "Dr. Priya Iyer",
    email: "priya.iyer@wellnesshub.in",
    location: "Bengaluru, Karnataka",
    specialization: "Trauma",
    availability: "Weekends",
    sessionType: "Online",
  },
  {
    id: "4",
    name: "Dr. Arjun Nair",
    email: "arjun.nair@serenitycare.in",
    location: "Chennai, Tamil Nadu",
    specialization: "Relationship",
    availability: "Flexible",
    sessionType: "Hybrid",
  },
  {
    id: "5",
    name: "Dr. Kavya Patel",
    email: "kavya.patel@innerpeace.in",
    location: "Ahmedabad, Gujarat",
    specialization: "Anxiety",
    availability: "Weekdays",
    sessionType: "Online",
  },
  {
    id: "6",
    name: "Dr. Siddharth Verma",
    email: "siddharth.verma@mindspace.in",
    location: "Hyderabad, Telangana",
    specialization: "Depression",
    availability: "Evenings",
    sessionType: "Hybrid",
  },
];