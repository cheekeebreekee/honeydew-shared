export const getResourceName = (resourcePartialName: string): string => {
  console.log("Env variable", process.env);

  const resourceName = `${resourcePartialName}-${process.env.ENVIRONMENT}`;

  return resourceName;
};
