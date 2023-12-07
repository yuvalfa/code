

export function getConfiguredDepth(defaultDepth:number = 3, maxDepth:number = 5): number {
    const configuredDepthString: string | undefined = process.env.DEPTH;

    if (configuredDepthString) {
      const configuredDepth: number = parseInt(configuredDepthString, 10);
      if (!isNaN(configuredDepth) && configuredDepth >= 0) {
        return Math.min(configuredDepth, maxDepth);
      }
    }
  
    return defaultDepth;
  }