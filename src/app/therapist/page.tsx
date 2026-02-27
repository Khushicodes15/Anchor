"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { crisisTheme } from "@/styles/Theme";
import { X } from "lucide-react";

type CardType = "connect" | "directory" | "export" | null;
type DemoTherapist = {
  id: string;
  name: string;
  specialization: string;
  location: string;
  availability: string;
  sessionType: string;
  email: string;
  phone: string;
};
const demoTherapists: DemoTherapist[] = [
  {
    id: "1",
    name: "Dr. Ananya Sharma",
    specialization: "Anxiety",
    location: "Mumbai",
    availability: "Weekends",
    sessionType: "Online",
    email: "ananya.sharma@mindcare.in",
    phone: "+91 98765 43210",
  },
  {
    id: "2",
    name: "Dr. Rohan Mehta",
    specialization: "Depression",
    location: "Delhi",
    availability: "Evenings",
    sessionType: "In-Person",
    email: "rohan.mehta@healinghub.in",
    phone: "+91 91234 56789",
  },
  {
    id: "3",
    name: "Dr. Priya Iyer",
    specialization: "Trauma",
    location: "Bengaluru",
    availability: "This Week",
    sessionType: "Online",
    email: "priya.iyer@calmspace.in",
    phone: "+91 99887 77665",
  },
  {
    id: "4",
    name: "Dr. Arjun Kapoor",
    specialization: "Relationships",
    location: "Pune",
    availability: "Next Week",
    sessionType: "Hybrid",
    email: "arjun.kapoor@balancecare.in",
    phone: "+91 97654 33221",
  },
  {
    id: "5",
    name: "Dr. Meera Nair",
    specialization: "Stress Management",
    location: "Chennai",
    availability: "Morning Slots",
    sessionType: "Hybrid",
    email: "meera.nair@peaceclinic.in",
    phone: "+91 98450 22119",
  },
  {
    id: "6",
    name: "Dr. Kunal Verma",
    specialization: "Child & Adolescent Therapy",
    location: "Hyderabad",
    availability: "Afternoon Slots",
    sessionType: "In-Person",
    email: "kunal.verma@familycare.in",
    phone: "+91 90321 44567",
  },
];

export default function TherapistPage() {
  const [active, setActive] = useState<CardType>(null);

  // CONNECT STATE
  const [therapistEmail, setTherapistEmail] = useState("");
  const [connectLoading, setConnectLoading] = useState(false);
  const [connectSuccess, setConnectSuccess] = useState(false);

  // DIRECTORY STATE
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [availability, setAvailability] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [results, setResults] = useState<DemoTherapist[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // CONNECT DEMO HANDLER
  const handleConnectDemo = () => {
    if (!therapistEmail.trim()) return;

    setConnectLoading(true);
    setConnectSuccess(false);

    setTimeout(() => {
      setConnectLoading(false);
      setConnectSuccess(true);
      setTherapistEmail("");
    }, 800);
  };

  // SEARCH DEMO HANDLER
  const handleSearchDemo = () => {
    setSearchLoading(true);

    setTimeout(() => {
      const filtered = demoTherapists.filter((t) => {
        return (
          (!location ||
            t.location.toLowerCase().includes(location.toLowerCase())) &&
          (!specialization || t.specialization === specialization) &&
          (!availability || t.availability === availability) &&
          (!sessionType || t.sessionType === sessionType)
        );
      });

      setResults(filtered);
      setSearchLoading(false);
    }, 800);
  };

  const cards = [
    { id: "connect", title: "Connect Therapist" },
    { id: "directory", title: "Find a Therapist" },
    { id: "export", title: "Export Therapy Report" },
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/flowers_.jpg')" }}
    >
      <div className="absolute inset-0 bg-yellow-50/25" />

      <div className="max-w-4xl mx-auto py-10 relative z-10">
        <h1
          className="text-3xl font-semibold mb-8"
          style={{ color: crisisTheme.colors.textPrimary }}
        >
          Therapist Support
        </h1>

        <div className="space-y-6">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layoutId={card.id}
              onClick={() => setActive(card.id as CardType)}
              className="p-6 rounded-2xl cursor-pointer"
              style={{
                background: crisisTheme.colors.surface,
                border: `1px solid ${crisisTheme.colors.border}`,
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                className="text-xl font-medium"
                style={{ color: crisisTheme.colors.textPrimary }}
              >
                {card.title}
              </h2>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              layoutId={active}
              className="fixed inset-0 z-50 p-10 overflow-auto"
              style={{ background: crisisTheme.colors.background }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <button
                  onClick={() => setActive(null)}
                  className="mb-6 p-3 rounded-full"
                  style={{ background: crisisTheme.colors.primarySoft }}
                >
                  <X size={18} />
                </button>

                {/* CONNECT */}
                {active === "connect" && (
                  <div className="max-w-lg space-y-6">
                    <h2 className="text-2xl font-semibold">
                      Connect Therapist
                    </h2>

                    <p>
                      Securely connect your licensed therapist using their
                      professional email address.
                    </p>

                    <input
                      type="email"
                      value={therapistEmail}
                      onChange={(e) =>
                        setTherapistEmail(e.target.value)
                      }
                      placeholder="therapist@example.com"
                      className="w-full px-4 py-3 rounded-xl"
                      style={{
                        background: crisisTheme.colors.surface,
                        border: `1px solid ${crisisTheme.colors.border}`,
                      }}
                    />

                    <button
                      onClick={handleConnectDemo}
                      disabled={connectLoading}
                      className="px-6 py-3 rounded-xl"
                      style={{
                        background: crisisTheme.colors.primary,
                        color: "#fff",
                        opacity: connectLoading ? 0.7 : 1,
                      }}
                    >
                      {connectLoading
                        ? "Sending..."
                        : "Send Connection Request"}
                    </button>

                    {connectSuccess && (
                      <p className="text-green-600 font-medium">
                        ✅ Connection request sent successfully
                      </p>
                    )}
                  </div>
                )}

                {/* DIRECTORY */}
                {active === "directory" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">
                      Find a Therapist
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        value={location}
                        onChange={(e) =>
                          setLocation(e.target.value)
                        }
                        placeholder="Location (City / State)"
                        className="px-4 py-3 rounded-xl"
                      />

                      <select
                        value={specialization}
                        onChange={(e) =>
                          setSpecialization(e.target.value)
                        }
                        className="px-4 py-3 rounded-xl"
                      >
<option value="">Specialization</option>
<option>Anxiety</option>
<option>Depression</option>
<option>Trauma</option>
<option>Relationships</option>
<option>Stress Management</option>
<option>Child & Adolescent Therapy</option>
<option>Marriage Counselling</option>
<option>Grief Therapy</option>
<option>Addiction Recovery</option>
<option>Workplace Burnout</option>
<option>OCD</option>
<option>Panic Disorder</option>
                      </select>

                      <select
                        value={availability}
                        onChange={(e) =>
                          setAvailability(e.target.value)
                        }
                        className="px-4 py-3 rounded-xl"
                      >
                        <option value="">Availability</option>
<option value="">Availability</option>
<option>This Week</option>
<option>Next Week</option>
<option>Evenings</option>
<option>Weekends</option>
<option>Morning Slots</option>
<option>Afternoon Slots</option>
<option>Flexible</option>
<option>Urgent Consultation</option>
                      </select>

                      <select
                        value={sessionType}
                        onChange={(e) =>
                          setSessionType(e.target.value)
                        }
                        className="px-4 py-3 rounded-xl"
                      >
                        <option value="">Session Type</option>
<option value="">Session Type</option>
<option>Online</option>
<option>In-Person</option>
<option>Hybrid</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSearchDemo}
                      className="px-6 py-3 rounded-xl"
                      style={{
                        background: crisisTheme.colors.primary,
                        color: "#fff",
                      }}
                    >
                      {searchLoading
                        ? "Searching..."
                        : "Search Therapists"}
                    </button>

                    {results.length > 0 && (
                      <div className="space-y-4 mt-6">
                        {results.map((t) => (
                          <div
                            key={t.id}
                            className="p-6 rounded-2xl border"
                          >
                            <h3 className="font-semibold text-lg">
                              {t.name}
                            </h3>
                            <p>
                              {t.specialization} • {t.location}
                            </p>
<p className="text-sm mt-1">
  {t.sessionType} • {t.availability}
</p>

<p className="text-sm mt-2">
  📧 {t.email}
</p>

<p className="text-sm">
  📞 {t.phone}
</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* EXPORT unchanged */}
{/* EXPORT */}
{active === "export" && (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold">
      Export Therapy Report
    </h2>

    <p>
      Download your structured journal summary for therapy sessions.
    </p>

    <div className="space-y-4">
      <button
        className="w-full px-6 py-3 rounded-xl"
        style={{
          background: crisisTheme.colors.primary,
          color: "#fff",
        }}
      >
        Download PDF
      </button>

      <button
        className="w-full px-6 py-3 rounded-xl"
        style={{
          background: crisisTheme.colors.secondary,
          color: "#fff",
        }}
      >
        Share with Therapist
      </button>

      <button
        className="w-full px-6 py-3 rounded-xl"
        style={{
          background: crisisTheme.colors.primarySoft,
          color: crisisTheme.colors.textPrimary,
        }}
      >
        Email Report
      </button>
    </div>
  </div>
)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}