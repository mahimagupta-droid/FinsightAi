import {Card} from "@heroui/react";

export function CardVariant() {
  return (
    <>
    <h1 className="text-4xl m-2 text-center font-bold mb-6 mt-10">Our Testimonials</h1>
    <div className="flex justify-center items-center rounded pb-14 w-full"> 
    <div className="flex flex-row flex-wrap justify-center gap-4">
      <Card className="w-[320px] bg-card p-4 rounded border flex flex-col justify-center items-center" variant="transparent">
        <Card.Header>
          <Card.Title>lorem123</Card.Title>
          <Card.Description>Minimal prominence with transparent background</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Use for less important content or nested cards</p>
        </Card.Content>
      </Card>

      <Card className="w-[320px] bg-card p-4 rounded border flex flex-col justify-center items-center" variant="default">
        <Card.Header>
          <Card.Title>Default</Card.Title>
          <Card.Description>Standard card appearance (bg-surface)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>The default card variant for most use cases</p>
        </Card.Content>
      </Card>

      <Card className="w-[320px] bg-card p-4 rounded border flex flex-col justify-center items-center" variant="secondary">
        <Card.Header>
          <Card.Title>Secondary</Card.Title>
          <Card.Description>Medium prominence (bg-surface-secondary)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Use to draw moderate attention</p>
        </Card.Content>
      </Card>

      <Card className="w-[320px] bg-card p-4 rounded border flex flex-col justify-center items-center" variant="tertiary">
        <Card.Header>
          <Card.Title>Tertiary</Card.Title>
          <Card.Description>Higher prominence (bg-surface-tertiary)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Use for primary or featured content</p>
        </Card.Content>
      </Card>
    </div>
    </div>
    </>
  );
}