// import react dependency
import React, { useState } from "react";

// import chakra dependency
import { Badge } from "@chakra-ui/react";

// import colors
import { badgeColors } from "../utils/badgeColors";

const TypeBadge = ({ color = "purple", text = "type" }) => {
  const [badgeColor, setBadgeColor] = useState(() =>
    color === "random"
      ? badgeColors[Math.floor(Math.random() * badgeColors.length)]
      : color
  );
  return <Badge colorScheme={badgeColor}>{text}</Badge>;
};

export default TypeBadge;
