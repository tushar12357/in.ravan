import { useEffect } from 'react';

interface WidgetDemoProps {
  tagName: string;
  agentId: string;
  schema: string;
  type?: string;
}

export const WidgetDemo = ({ tagName, agentId, schema, type }: WidgetDemoProps) => {
  useEffect(() => {
    if (!window.process || !window.process.env) {
      window.process = { env: {} };
    }
  }, []);

  const CustomWidget = tagName;
  const props = { agent_id: agentId, schema };
  if (type) props.type = type;

  return (
    <div className="widget-wrapper">
      <CustomWidget {...props} />
     
    </div>
  );
};


