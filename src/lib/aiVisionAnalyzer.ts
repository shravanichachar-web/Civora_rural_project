import { AiAnalysisResult } from '../types';

export interface CategoryAnalysisPreset {
  category: string;
  department: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  estimatedResolutionTime: string;
  suggestedDescription: string;
  detectedObjects: string[];
  severityLevel: 'Minor' | 'Moderate' | 'Severe' | 'Critical';
  confidenceBase: number;
}

export const SUPPORTED_AI_CATEGORIES: CategoryAnalysisPreset[] = [
  {
    category: 'Garbage Overflow',
    department: 'Sanitation Department',
    priority: 'High',
    estimatedResolutionTime: '24 Hours',
    suggestedDescription: 'Severe municipal garbage overflow accumulated near roadside bin container, requiring immediate clearance and sanitization.',
    detectedObjects: ['Overflowing Garbage Bin', 'Plastic Bags', 'Organic Waste', 'Street Litter'],
    severityLevel: 'Severe',
    confidenceBase: 96,
  },
  {
    category: 'Water Leakage',
    department: 'Water Works Department',
    priority: 'High',
    estimatedResolutionTime: '12 Hours',
    suggestedDescription: 'Underground municipal water supply pipe leak producing continuous surface runoff and road erosion.',
    detectedObjects: ['Water Stream', 'Burst Water Main', 'Pavement Runoff', 'Wet Asphalt'],
    severityLevel: 'Severe',
    confidenceBase: 94,
  },
  {
    category: 'Road Pothole',
    department: 'Public Works Department (PWD)',
    priority: 'High',
    estimatedResolutionTime: '48 Hours',
    suggestedDescription: 'Deep asphalt road pothole (~10cm depth) creating severe hazard for light vehicles and commuter traffic.',
    detectedObjects: ['Damaged Asphalt', 'Road Pothole', 'Cracked Pavement', 'Loose Gravel'],
    severityLevel: 'Critical',
    confidenceBase: 97,
  },
  {
    category: 'Drainage Blockage',
    department: 'Drainage & Public Health Dept',
    priority: 'Emergency',
    estimatedResolutionTime: '18 Hours',
    suggestedDescription: 'Choked underground storm water drain line leading to stagnant foul water flooding on public road.',
    detectedObjects: ['Choked Manhole', 'Stagnant Sewage', 'Debris Obstruction', 'Drainage Grate'],
    severityLevel: 'Critical',
    confidenceBase: 95,
  },
  {
    category: 'Street Light Not Working',
    department: 'Electrical Department',
    priority: 'Medium',
    estimatedResolutionTime: '24 Hours',
    suggestedDescription: 'Damaged or fused LED street light luminaire fixture resulting in dark unsafe zone at night.',
    detectedObjects: ['Pole Fixture', 'Faulty Luminaire', 'Exposed Wiring', 'Electrical Box'],
    severityLevel: 'Moderate',
    confidenceBase: 93,
  },
  {
    category: 'Broken Footpath',
    department: 'Public Works Department (PWD)',
    priority: 'Medium',
    estimatedResolutionTime: '72 Hours',
    suggestedDescription: 'Broken or missing concrete paver blocks on pedestrian sidewalk presenting tripping hazard.',
    detectedObjects: ['Dislodged Paver Blocks', 'Cracked Concrete', 'Uneven Sidewalk', 'Exposed Soil'],
    severityLevel: 'Moderate',
    confidenceBase: 92,
  },
  {
    category: 'Fallen Tree',
    department: 'Parks & Gardens Department',
    priority: 'Emergency',
    estimatedResolutionTime: '12 Hours',
    suggestedDescription: 'Large fallen tree branch obstructing main traffic lane and entangling low-hanging cable wires.',
    detectedObjects: ['Fallen Tree Trunk', 'Obstructed Roadway', 'Broken Branches', 'Foliage Debris'],
    severityLevel: 'Critical',
    confidenceBase: 98,
  },
  {
    category: 'Illegal Garbage Dump',
    department: 'Sanitation Department',
    priority: 'High',
    estimatedResolutionTime: '24 Hours',
    suggestedDescription: 'Unauthorized open dumping of construction debris and commercial refuse on public municipal land.',
    detectedObjects: ['Unsegregated Rubble', 'Construction Debris', 'Commercial Waste', 'Vacant Plot Dump'],
    severityLevel: 'Severe',
    confidenceBase: 96,
  },
  {
    category: 'Public Toilet Issue',
    department: 'Public Health & Sanitation',
    priority: 'High',
    estimatedResolutionTime: '12 Hours',
    suggestedDescription: 'Public facility hygiene issue due to choked water supply inlet or damaged sanitary fittings.',
    detectedObjects: ['Public Facility', 'Plumbing Issue', 'Sanitation Fixture', 'Cleaning Needed'],
    severityLevel: 'Severe',
    confidenceBase: 95,
  },
  {
    category: 'Other',
    department: 'General Municipal Administration',
    priority: 'Medium',
    estimatedResolutionTime: '48 Hours',
    suggestedDescription: 'Civic infrastructure anomaly detected requiring field inspection by Kasba Bawada ward officer.',
    detectedObjects: ['Unidentified Infrastructure', 'Civil Hazard', 'Municipal Structure'],
    severityLevel: 'Minor',
    confidenceBase: 90,
  },
];

/**
 * Intelligent Image Complaint Classifier
 * Simulates real-time multi-modal AI Vision analysis
 */
export async function analyzeComplaintImage(imageUrlOrBase64: string): Promise<AiAnalysisResult> {
  // Simulate rapid AI neural network inference delay (800ms - 1500ms)
  await new Promise((resolve) => setTimeout(resolve, 1100));

  let matchedCategory = SUPPORTED_AI_CATEGORIES[0]; // Default Garbage Overflow

  const str = imageUrlOrBase64.toLowerCase();

  if (str.includes('water') || str.includes('leak') || str.includes('pipe') || str.includes('flow')) {
    matchedCategory = SUPPORTED_AI_CATEGORIES.find((c) => c.category === 'Water Leakage')!;
  } else if (str.includes('pothole') || str.includes('road') || str.includes('crack') || str.includes('asphalt')) {
    matchedCategory = SUPPORTED_AI_CATEGORIES.find((c) => c.category === 'Road Pothole')!;
  } else if (str.includes('light') || str.includes('lamp') || str.includes('pole') || str.includes('electric')) {
    matchedCategory = SUPPORTED_AI_CATEGORIES.find((c) => c.category === 'Street Light Not Working')!;
  } else if (str.includes('drain') || str.includes('sewage') || str.includes('choke') || str.includes('manhole')) {
    matchedCategory = SUPPORTED_AI_CATEGORIES.find((c) => c.category === 'Drainage Blockage')!;
  } else if (str.includes('footpath') || str.includes('paver') || str.includes('walk') || str.includes('tile')) {
    matchedCategory = SUPPORTED_AI_CATEGORIES.find((c) => c.category === 'Broken Footpath')!;
  } else if (str.includes('tree') || str.includes('branch') || str.includes('leaf') || str.includes('fallen')) {
    matchedCategory = SUPPORTED_AI_CATEGORIES.find((c) => c.category === 'Fallen Tree')!;
  } else if (str.includes('dump') || str.includes('rubble') || str.includes('construction') || str.includes('illegal')) {
    matchedCategory = SUPPORTED_AI_CATEGORIES.find((c) => c.category === 'Illegal Garbage Dump')!;
  } else if (str.includes('toilet') || str.includes('sanitary') || str.includes('washroom')) {
    matchedCategory = SUPPORTED_AI_CATEGORIES.find((c) => c.category === 'Public Toilet Issue')!;
  } else if (str.includes('garbage') || str.includes('trash') || str.includes('bin') || str.includes('waste')) {
    matchedCategory = SUPPORTED_AI_CATEGORIES.find((c) => c.category === 'Garbage Overflow')!;
  } else {
    // Pick based on deterministic hash of image URL string or random
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % (SUPPORTED_AI_CATEGORIES.length - 1);
    matchedCategory = SUPPORTED_AI_CATEGORIES[idx];
  }

  // Calculate high confidence percentage (between 92% and 98%)
  const variance = (Math.random() * 4 - 2).toFixed(1);
  const confidence = Math.min(99, Math.max(88, Number((matchedCategory.confidenceBase + parseFloat(variance)).toFixed(1))));

  return {
    category: matchedCategory.category,
    confidence,
    priority: matchedCategory.priority,
    department: matchedCategory.department,
    estimatedResolutionTime: matchedCategory.estimatedResolutionTime,
    suggestedDescription: matchedCategory.suggestedDescription,
    detectedObjects: matchedCategory.detectedObjects,
    severityLevel: matchedCategory.severityLevel,
    timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  };
}
