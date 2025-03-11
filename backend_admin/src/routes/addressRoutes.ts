import { Router } from "express";
import { updateAddress, getAddress, deleteAddress, getDelivery, updateDelivery } from "../controllers/address.controller";

const router = Router();

router.put("/updateCustomer/:userId", updateAddress);
router.delete("/removeCustomer/:addressId", deleteAddress);
router.get("/getCustomer/:userId", getAddress);
router.get("/getDelivery/:userId", getDelivery);
router.put("/updateDelivery/:userId", updateDelivery);

export default router;