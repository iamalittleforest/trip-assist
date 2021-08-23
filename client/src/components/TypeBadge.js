// import react dependency
import React from 'react';

// import chakra dependency
import { Badge } from '@chakra-ui/react';

// import colors
import { badgeColors } from '../utils/badgeColors'

const TypeBadge = ({ color = 'purple', text = 'type' }) => {
  return (
    <Badge
      colorScheme={color === 'random' ? badgeColors[Math.floor(Math.random() * badgeColors.length)] : color}
    >
      {text}
    </Badge>
  )
}

export default TypeBadge;