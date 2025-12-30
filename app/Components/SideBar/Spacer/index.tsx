type SpacerType = {
  indentation?: number;
};

export const Spacer = (props: SpacerType) => {
  const { indentation = 0 } = props;
  const spacerWidth = indentation * 20;

  return (
    <div
      style={{
        width: `${spacerWidth}px`,
        flexShrink: 0,
      }}
    />
  );
};