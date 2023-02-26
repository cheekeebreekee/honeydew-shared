export const getResourceName = (resourcePartialName: string): string => {
  const resourceName = `${resourcePartialName}-${process.env.ENVIRONMENT}`;

  return resourceName;
};
