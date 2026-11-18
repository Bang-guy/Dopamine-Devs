export interface TutorialStep {
  id: string;
  targetId: string;
  textKey: string;
  route: string;
}

export const tutorialSteps: TutorialStep[] = [
  { id: 'home-check',    targetId: 'home-card-check',    textKey: 'tutorial.checkText',    route: '/app/home' },
  { id: 'home-practice', targetId: 'home-card-practice', textKey: 'tutorial.practiceText', route: '/app/home' },
  { id: 'home-learn',    targetId: 'home-card-learn',    textKey: 'tutorial.learnText',    route: '/app/home' },
  { id: 'home-help',     targetId: 'home-card-help',     textKey: 'tutorial.helpText',     route: '/app/home' },
  { id: 'panic-bar',     targetId: 'panic-bar',          textKey: 'tutorial.panicText',    route: '/app/home' },
  { id: 'top-settings',  targetId: 'top-settings',       textKey: 'tutorial.settingsText', route: '/app/home' },
];
