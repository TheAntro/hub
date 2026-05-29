import { Button } from "@/components/ui/button";

export function TestButton() {
  return (
    <Button variant="outline" onClick={() => console.log("Hello world!")}>
      Click me!
    </Button>
  );
}
