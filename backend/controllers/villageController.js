const Village = require("../models/village");




 const getFundAllocationsVillages = async (req, res) => {
  try {
    const villages = await Village.find();

    if (!villages || villages.length === 0) {
      return res.status(404).json({ message: "No villages found" });
    }

    // Flatten all fund allocations across all villages
    const fundAllocations = villages.flatMap((village) =>
      (village.fundAllocations || []).map((fund) => ({
        villageID: village.villageID,
        villageName: village.villageName,
        district: village.district,
        state: village.state,
        amount: fund.amount,
        allocatedBy: fund.allocatedBy,
        allocatedAt: fund.allocatedAt,
      }))
    );

    if (fundAllocations.length === 0) {
      return res.status(404).json({ message: "No fund allocations found" });
    }

    return res.status(200).json({ data: fundAllocations });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports = getFundAllocationsVillages;