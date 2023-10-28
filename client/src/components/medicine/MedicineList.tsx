import { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import config from "../../config/config";

import { Medicine } from "../../types";
import { MedicineUsages } from "../../data/medicines";
import EditMedicineModal from "./EditMedicineModal";
import MedicineCard from "./MedicineCard";
import { NameSearchBar, goSearch } from "../../components/search/NameSearchBar";

interface Props {
  canEdit: boolean;
  canBuy: boolean;
  canViewSales: boolean;
  canViewQuantity: boolean;
}

const MedicineList: React.FC<Props> = ({
  canBuy,
  canEdit,
  canViewSales,
  canViewQuantity,
}) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [usageFilter, setUsageFilter] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [medSales, setMedSales] = useState<{ [key: string]: number }>({});

  const filterOptions = MedicineUsages;

  useEffect(() => {
    if (canViewSales) {
      loadSales();
    }
  }, [canViewSales]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const loadSales = async () => {
    const response = await axios.get<{ [key: string]: number }>(
      `${config.API_URL}/medicines/sales`
    );
    setMedSales(response.data);
  };

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

  const handleEditClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleClose = () => {
    setSelectedMedicine(null);
  };

  const handleShowMoreClick = () => {
    setShowMore(true);
  };

  const handleShowLessClick = () => {
    setShowMore(false);
  };

  const handleUsageFilterChange =
    (option: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setUsageFilter((prev) => [...prev, option]);
      } else {
        setUsageFilter((prev) => prev.filter((value) => value !== option));
      }
    };

  const filteredMedicines =
    usageFilter.length > 0
      ? medicines.filter((medicine) =>
          medicine.usages
            ? medicine.usages.some((usage) =>
                usageFilter.some((filter) =>
                  usage.toLowerCase().includes(filter.toLowerCase())
                )
              )
            : false
        )
      : medicines;

  return (
    <Grid container>
      <Grid item sm={12} md={2}>
        <Box mt={1} />
        <Typography variant="h6" gutterBottom>
          Medicine Usages
        </Typography>
        {(showMore ? filterOptions : filterOptions.slice(0, 10)).map(
          (option) => (
            <Box marginBottom={-1} key={option}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={usageFilter.includes(option)}
                    onChange={handleUsageFilterChange(option)}
                    value={option}
                    size="small"
                  />
                }
                label={option}
              />
            </Box>
          )
        )}
        {!showMore && filterOptions.length > 10 && (
          <Button onClick={handleShowMoreClick} color="secondary">
            Show more
          </Button>
        )}
        {showMore && (
          <Button onClick={handleShowLessClick} color="secondary">
            Show less
          </Button>
        )}
      </Grid>
      <Grid
        item
        sm={12}
        md={10}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "start",
        }}
      >
        <NameSearchBar
          searchCollection="medicines"
          onSearch={handleSearch}
          initialValue="(or leave empty for all)"
        />
        {filteredMedicines.length === 0 && <p>No medicines found.</p>}
        {filteredMedicines.map((medicine) => (
          <div
            key={medicine._id}
            style={{ padding: "0rem", boxSizing: "border-box" }}
          >
            <MedicineCard
              medicine={medicine}
              canBuy={canBuy}
              canEdit={canEdit}
              canViewSales={canViewSales}
              canViewQuantity={canViewQuantity}
              sales={medSales[medicine._id]}
              handleEditClick={handleEditClick}
            />
            {selectedMedicine && selectedMedicine._id === medicine._id && (
              <EditMedicineModal
                open={!!selectedMedicine}
                medicine={selectedMedicine}
                onClose={handleClose}
              />
            )}
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default MedicineList;