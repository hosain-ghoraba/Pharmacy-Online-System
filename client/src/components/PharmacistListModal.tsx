import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Pharmacist from "../types/Pharmacist";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Props {
  children?: React.ReactNode;
  pharmacists: Pharmacist[];
}
export default function PharmacistListModal({
  pharmacists = [],
}: Props): React.ReactElement<Props> {
  const [open, setOpen] = React.useState(false);
  const [currentPharmacist, setCurrentPharmacist] = React.useState<Pharmacist>(
    pharmacists[0]
  );
  const handleOpen = (index: number) => {
    setOpen(true);
    setCurrentPharmacist(pharmacists[index]);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      {pharmacists.map((pharmacist, index) => (
        <div
          key={index}
          style={{
            display: "block",
            paddingBottom: "1rem",
          }}
        >
          <div style={{ display: "block", padding: "1rem" }}>
            <h5 style={{ display: "inline" }}>Name:</h5>
            {pharmacist.name},{" "}
            <span style={{ color: "grey" }}>{`(${pharmacist.username})`}</span>
          </div>
          <div
            style={{
              display: "block",
              paddingTop: "0rem",
              paddingLeft: "1.2rem",
            }}
          >
            <h5 style={{ display: "inline" }}>Email:</h5>{" "}
            <span>{pharmacist.email}</span>
          </div>
          <Button
            id={`viewPhButton${index}`}
            key={index}
            onClick={() => handleOpen(index)}
            style={{ float: "right" }}
          >
            view Pharmacist
          </Button>
          <br />
          <br />
          <hr />
        </div>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pharmacist Information
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "600px",
                margin: "auto",
              }}
            >
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px",
                }}
              >
                Name:
              </h6>{" "}
              <span style={{ display: "inline" }}>
                {currentPharmacist.name}
              </span>
              <br />
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px",
                }}
              >
                Username:
              </h6>{" "}
              <span style={{ display: "inline" }}>
                {currentPharmacist.username}
              </span>
              <br />
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px",
                }}
              >
                Gender:
              </h6>{" "}
              <span style={{ display: "inline" }}>
                {currentPharmacist.gender}
              </span>
              <br />
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px",
                }}
              >
                Email:
              </h6>{" "}
              <span style={{ display: "inline" }}>
                {currentPharmacist.email}
              </span>
              <br />
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px",
                }}
              >
                Date of Birth:
              </h6>
              <span style={{ display: "inline" }}>
                {currentPharmacist.dateOfBirth.toString().slice(0, 10)}
              </span>
              <br />
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px",
                }}
              >
                Mobile Number:
              </h6>{" "}
              <span style={{ display: "inline" }}>
                {currentPharmacist.mobileNumber}
              </span>
              <br />
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px",
                }}
              >
                Hourly Rate:
              </h6>{" "}
              <span style={{ display: "inline" }}>
                {currentPharmacist.hourlyRate}
              </span>
              <br />
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px",
                }}
              >
                Affiliation:
              </h6>{" "}
              <span style={{ display: "inline" }}>
                {currentPharmacist.affiliation}
              </span>
              <br />
              <h6
                style={{
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10px",
                }}
              >
                Educational Background:
              </h6>
              <span style={{ display: "inline" }}>
                {currentPharmacist.educationalBackground}
              </span>
            </div>
          </Typography>

          <Button onClick={handleClose} color="info">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
