import {Card} from "@heroui/react";
type CardVariantTypes = {
  name: string
  role: string,
  text: string
}
export function TestimonialCard({name, role, text}: CardVariantTypes) {
  return (
    <div className="flex justify-center w-full">
      <Card className="w-[320px] h-47.5 bg-card text-card-textColor p-6 rounded border border-border flex flex-col justify-between items-start font-lexend transition-colors duration-300" variant="transparent"> 
        <Card.Header>
          <Card.Title className="font-bold text-lg">{name}</Card.Title>
          <Card.Description className="text-[14px] opacity-85">{role}</Card.Description>
        </Card.Header>
        <Card.Content className="text-[15px] leading-relaxed flex-1">
          <p>{text}</p>
        </Card.Content>
      </Card>
    </div>
  );
}