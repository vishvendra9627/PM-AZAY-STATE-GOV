const { Router } = require("express");
const  getFundAllocationsVillages  = require("../controllers/villageController.js");

const  router=Router();

router.get("/villages-fund-allocations", getFundAllocationsVillages);



module.exports = router; 