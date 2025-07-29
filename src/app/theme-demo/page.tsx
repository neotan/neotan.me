import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ThemeDemoPage() {
  return (
    <div className="container mx-auto space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Theme Demo</h1>
        <ThemeToggle />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Light Theme</CardTitle>
            <CardDescription>Default light theme with clean design</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is the standard light theme with a clean, minimal design.
            </p>
            <Button className="mt-4">Primary Button</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dark Theme</CardTitle>
            <CardDescription>Dark theme for better eye comfort</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dark theme provides better contrast and reduces eye strain.
            </p>
            <Button className="mt-4">Primary Button</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pumpkin Theme</CardTitle>
            <CardDescription>Warm pumpkin-inspired theme</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The new pumpkin theme features warm orange accents and dark backgrounds.
            </p>
            <Button className="mt-4">Primary Button</Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Color Palette</h3>
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded bg-primary" />
              <div className="h-8 w-8 rounded bg-secondary" />
              <div className="h-8 w-8 rounded bg-accent" />
              <div className="h-8 w-8 rounded bg-muted" />
              <div className="h-8 w-8 rounded bg-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Typography</h3>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Small muted text</p>
              <p className="text-base">Regular text</p>
              <p className="text-lg font-medium">Medium text</p>
              <p className="text-xl font-semibold">Large text</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">How to Use</h2>
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm">
            <strong>Click the theme toggle button</strong> in the top right to cycle through:
            <br />
            Light → Dark → Pumpkin → Light
          </p>
        </div>
      </div>
    </div>
  )
} 