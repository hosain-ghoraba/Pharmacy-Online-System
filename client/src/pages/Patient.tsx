import { useEffect, useState } from "react";
import axios from "axios";

import config from "../config/config";

import MedicineList from "../components/MedicineList";
import { Medicine } from "../types";
import { NameSearchBar, goSearch } from "../components/NameSearchBar";
import BasicTabs from "../components/BasicTabs";

const PatientPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [usageFilter, setUsageFilter] = useState<string | null>(null);

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

  const handleSearch = async (searchTerm: string, searchCollection: string) => {
    try {
      let responseData = await goSearch(searchTerm, searchCollection);
      console.log(responseData);
      setMedicines(responseData);
    } catch (err: any) {
      if (err.response?.status === 400) {
        console.log("Get All Meds");
        fetchMedicines();
        return;
      }
      if (err.response?.status === 404) {
        console.log("No Medicine with this name");
        setMedicines([]);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1>Patient Dashboard</h1>
      <BasicTabs tabNames={["View Medicines"]}>
        {/* each child/component/tag is a tab */}
        <div>
          <NameSearchBar
            searchCollection="medicines"
            onSearch={handleSearch}
            initialValue="(or leave empty for all)"
          />
          <MedicineList
            medicines={medicines}
            canEdit={false}
            canViewSales={false}
            canViewQuantity={false}
            usageFilter={usageFilter}
            setUsageFilter={setUsageFilter}
          />
        </div>
      </BasicTabs>
    </div>
  );
};

export default PatientPage;
