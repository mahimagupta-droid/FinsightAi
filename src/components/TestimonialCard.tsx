import {Card} from "@heroui/react";
type CardVariantTypes = {
  name: string
  role: string,
  text: string
}
export function TestimonialCard({name, role, text}: CardVariantTypes) {
  return (
    <>
    <div className="flex justify-center items-center rounded pb-14 w-full"> 
    <div className="flex flex-row flex-wrap justify-center gap-4">
      <Card className="w-[320px] bg-card p-4 rounded border flex flex-col justify-center items-center" variant="transparent">
        <Card.Header>
          <Card.Title>{name}</Card.Title>
          <Card.Description>{role}</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>{text}</p>
        </Card.Content>
      </Card>
    </div>
    </div>
    </>
  );
}