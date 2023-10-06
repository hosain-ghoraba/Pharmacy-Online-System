import { useEffect, useState } from "react";
import axios from "axios";

import config from "../config/config";

import MedicineList from "../components/MedicineList";
import { Medicine } from "../types";

const PatientPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get<Medicine[]>(
        `${config.API_URL}/medicines`
      );
      setMedicines(response.data);
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  };

  return (
    <div>
      <h1>Patient Page</h1>
      <MedicineList medicines={medicines} canEdit={false} />
    </div>
  );
};

export default PatientPage;