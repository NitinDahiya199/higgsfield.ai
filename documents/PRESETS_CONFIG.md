# Presets System Configuration

## Preset Schema

```typescript
interface Preset {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  config: PresetConfig;
  isDefault: boolean;
  isPublic: boolean;
}

interface PresetConfig {
  camera: CameraConfig;
  motion: MotionConfig;
  duration: number; // seconds
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:3' | '21:9';
  quality: 'standard' | 'high' | 'ultra';
  effects?: EffectsConfig;
}

interface CameraConfig {
  type: 'static' | 'dolly' | 'pan' | 'tilt' | 'zoom' | 'rotate' | 'orbit';
  speed: number; // 0.0 - 1.0
  direction?: 'in' | 'out' | 'left' | 'right' | 'up' | 'down';
  intensity?: number; // 0.0 - 1.0
}

interface MotionConfig {
  type: 'subtle' | 'smooth' | 'dynamic' | 'cinematic';
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

interface EffectsConfig {
  colorGrading?: 'warm' | 'cool' | 'vintage' | 'cinematic';
  grain?: number; // 0.0 - 1.0
  vignette?: number; // 0.0 - 1.0
}
```

## Default Presets

### Cinematic Presets

```json
{
  "name": "Cinematic Zoom In",
  "description": "Smooth dolly zoom effect for dramatic impact",
  "category": "cinematic",
  "config": {
    "camera": {
      "type": "zoom",
      "direction": "in",
      "speed": 0.6,
      "intensity": 0.7
    },
    "motion": {
      "type": "cinematic",
      "easing": "ease-in-out"
    },
    "duration": 5,
    "aspectRatio": "16:9",
    "quality": "high",
    "effects": {
      "colorGrading": "cinematic",
      "vignette": 0.3
    }
  }
}
```

```json
{
  "name": "Cinematic Pan Right",
  "description": "Smooth horizontal pan for landscape shots",
  "category": "cinematic",
  "config": {
    "camera": {
      "type": "pan",
      "direction": "right",
      "speed": 0.5,
      "intensity": 0.6
    },
    "motion": {
      "type": "smooth",
      "easing": "ease-in-out"
    },
    "duration": 6,
    "aspectRatio": "16:9",
    "quality": "high"
  }
}
```

### Social Media Presets

```json
{
  "name": "Vertical Story Zoom",
  "description": "Perfect for Instagram/TikTok stories",
  "category": "social",
  "config": {
    "camera": {
      "type": "zoom",
      "direction": "in",
      "speed": 0.4,
      "intensity": 0.5
    },
    "motion": {
      "type": "smooth",
      "easing": "ease-out"
    },
    "duration": 3,
    "aspectRatio": "9:16",
    "quality": "standard"
  }
}
```

```json
{
  "name": "Reel Pan Up",
  "description": "Vertical pan for short-form content",
  "category": "social",
  "config": {
    "camera": {
      "type": "pan",
      "direction": "up",
      "speed": 0.5,
      "intensity": 0.6
    },
    "motion": {
      "type": "dynamic",
      "easing": "linear"
    },
    "duration": 3,
    "aspectRatio": "9:16",
    "quality": "standard"
  }
}
```

### Static Presets

```json
{
  "name": "Static",
  "description": "No camera movement, perfect for portraits",
  "category": "static",
  "config": {
    "camera": {
      "type": "static",
      "speed": 0
    },
    "motion": {
      "type": "subtle",
      "easing": "linear"
    },
    "duration": 5,
    "aspectRatio": "1:1",
    "quality": "high"
  }
}
```

### Dynamic Presets

```json
{
  "name": "Orbit Rotation",
  "description": "Circular camera movement around subject",
  "category": "dynamic",
  "config": {
    "camera": {
      "type": "orbit",
      "speed": 0.7,
      "intensity": 0.8
    },
    "motion": {
      "type": "dynamic",
      "easing": "ease-in-out"
    },
    "duration": 8,
    "aspectRatio": "16:9",
    "quality": "high"
  }
}
```

```json
{
  "name": "Dolly In",
  "description": "Forward camera movement",
  "category": "dynamic",
  "config": {
    "camera": {
      "type": "dolly",
      "direction": "in",
      "speed": 0.6,
      "intensity": 0.7
    },
    "motion": {
      "type": "smooth",
      "easing": "ease-in"
    },
    "duration": 5,
    "aspectRatio": "16:9",
    "quality": "high"
  }
}
```

## Preset Categories

1. **Cinematic** - High-quality, dramatic movements
2. **Social** - Optimized for social media platforms
3. **Static** - No movement, focus on content
4. **Dynamic** - Energetic, fast-paced movements
5. **Portrait** - Optimized for people/subjects
6. **Landscape** - Wide shots, panning movements
7. **Product** - Showcase products with subtle movement

## Preset Validation

```typescript
function validatePreset(preset: Preset): boolean {
  // Check required fields
  if (!preset.name || !preset.config) return false;
  
  // Validate camera config
  const { camera, duration, aspectRatio } = preset.config;
  if (!camera || !duration || !aspectRatio) return false;
  
  // Validate camera speed (0-1)
  if (camera.speed < 0 || camera.speed > 1) return false;
  
  // Validate duration (1-30 seconds)
  if (duration < 1 || duration > 30) return false;
  
  // Validate aspect ratio
  const validRatios = ['16:9', '9:16', '1:1', '4:3', '21:9'];
  if (!validRatios.includes(aspectRatio)) return false;
  
  return true;
}
```

## Preset Application Logic

```typescript
async function applyPreset(
  imageUrl: string,
  preset: Preset
): Promise<string> {
  const { camera, motion, duration, aspectRatio } = preset.config;
  
  // Step 1: Generate video with motion
  const videoUrl = await generateVideoWithMotion({
    imageUrl,
    cameraType: camera.type,
    cameraSpeed: camera.speed,
    cameraDirection: camera.direction,
    motionType: motion.type,
    easing: motion.easing,
    duration,
    aspectRatio
  });
  
  // Step 2: Apply effects if any
  if (preset.config.effects) {
    return await applyEffects(videoUrl, preset.config.effects);
  }
  
  return videoUrl;
}
```

## Preset Storage

Presets should be stored in the database with the following structure:

```prisma
model Preset {
  id          String   @id @default(cuid())
  name        String
  description String?
  category    String
  thumbnail   String?
  config      Json     // PresetConfig
  isDefault   Boolean  @default(false)
  isPublic    Boolean  @default(true)
  userId      String?  // null for default presets
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User?    @relation(fields: [userId], references: [id])
  jobs        Job[]
}
```

## Seeding Default Presets

Create a seed script to populate default presets:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultPresets = [
  {
    name: "Cinematic Zoom In",
    description: "Smooth dolly zoom effect",
    category: "cinematic",
    config: { /* ... */ },
    isDefault: true,
    isPublic: true
  },
  // ... more presets
];

async function main() {
  for (const preset of defaultPresets) {
    await prisma.preset.create({
      data: preset
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run with:
```bash
npx prisma db seed
```

## Preset Preview Generation

Generate thumbnails/previews for presets:

```typescript
async function generatePresetPreview(preset: Preset): Promise<string> {
  // Use a sample image
  const sampleImage = await getSampleImage();
  
  // Generate a short preview (1-2 seconds)
  const previewUrl = await applyPreset(sampleImage, {
    ...preset,
    config: {
      ...preset.config,
      duration: 2 // Short preview
    }
  });
  
  // Extract thumbnail frame
  const thumbnail = await extractFrame(previewUrl, 1);
  
  // Upload and return URL
  return await uploadThumbnail(thumbnail);
}
```

## User Custom Presets

Allow users to create and save custom presets:

```typescript
// API endpoint
POST /api/presets
{
  "name": "My Custom Preset",
  "description": "My favorite settings",
  "category": "custom",
  "config": { /* ... */ },
  "isPublic": false
}
```

## Preset Recommendations

Implement a recommendation system based on:
- User's most used presets
- Project type
- Aspect ratio
- Content category

```typescript
async function getRecommendedPresets(
  userId: string,
  projectType?: string
): Promise<Preset[]> {
  // Get user's history
  const userJobs = await getJobsByUser(userId);
  
  // Analyze patterns
  const popularPresets = analyzePresetUsage(userJobs);
  
  // Return top 5
  return popularPresets.slice(0, 5);
}
```
