export const numberRender: (value: string | number) => string = value =>
  `₦${Number(value).toLocaleString()}`;

export const statusRender: (status: boolean) => JSX.Element = status => {
  return status ? (
    <span className="tag success">Active</span>
  ) : (
    <span className="tag failure">Inactive</span>
  );
};

export const percentRender: (percentage: number | string) => string =
  percentage => `${percentage}%`;
