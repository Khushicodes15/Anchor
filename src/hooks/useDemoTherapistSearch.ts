import { useState } from "react";
import { demoTherapists, DemoTherapist } from "@/lib/demoTherapists";

export function useDemoTherapistSearch() {
  const [results, setResults] = useState<DemoTherapist[]>([]);
  const [loading, setLoading] = useState(false);

  const search = (filters: {
    location?: string;
    specialization?: string;
    availability?: string;
    sessionType?: string;
  }) => {
    setLoading(true);

    setTimeout(() => {
      const filtered = demoTherapists.filter((t) => {
        return (
          (!filters.location ||
            t.location
              .toLowerCase()
              .includes(filters.location.toLowerCase())) &&
          (!filters.specialization ||
            t.specialization === filters.specialization) &&
          (!filters.availability ||
            t.availability === filters.availability) &&
          (!filters.sessionType ||
            t.sessionType === filters.sessionType)
        );
      });

      setResults(filtered);
      setLoading(false);
    }, 800);
  };

  return { results, loading, search };
}