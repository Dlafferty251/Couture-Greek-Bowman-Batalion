
import React from 'react';
import DesignToolsPanel from './DesignToolsPanel';
import LivePricingBox from './LivePricingBox';
import ProductOptionsForm from './ProductOptionsForm';

/**
 * Main sidebar containing tools, product options, and pricing
 */
export default function DesignerSidebar() {
  try {
    console.log('[🧱 COMPONENT] DesignerSidebar rendered');

    return (
      <aside style={{
        width: '300px',
        padding: '20px',
        backgroundColor: '#f1f1f1',
        borderRight: '2px solid #ddd',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <DesignToolsPanel />
        <ProductOptionsForm />
        <LivePricingBox />
      </aside>
    );
  } catch (err) {
    console.error('[❌ ERROR] DesignerSidebar failed to render', err);
    return <div>Error loading sidebar</div>;
  }
}