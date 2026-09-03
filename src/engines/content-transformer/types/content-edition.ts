export interface ContentEdition {
  identity: {
    id: string;
    version: string;
    language: string;
  };

  strategy: {
    editorialIntent: string;
    businessGoal: string;
    emotionalPromise: string;
  };

  audience: {
    persona: string;
    pain: string;
    desiredTransformation: string;
  };

  narrative: {
    coreMessage: string;
    opening: string;
    body: string;
    conclusion: string;
  };

  metadata: {
    createdAt: string;
    source: string;
  };
}