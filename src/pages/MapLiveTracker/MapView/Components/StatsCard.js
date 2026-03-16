import React from 'react'
import './StatsCard.css'

const StatsCard = ({ title, value, color }) => {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-title">{title}</div>
      <div className="stats-value" style={{ color }}>
        {value}
      </div>
    </div>
  )
}

export default StatsCard
