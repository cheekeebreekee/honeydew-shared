export const getResourceArn = (
  resoureType: string,
  resourceEntity: string,
  resourceName: string
) => {
  const resourceArn = `arn:aws:${resoureType}:${process.env.REGION}:${process.env.ACCOUNT_ID}:${resourceEntity}/${resourceName}-${process.env.ENV}`;

  return resourceArn;
};
