export const validator = schema => {
  return (req, res, next) => {
    const { error } = schema.unknown(true).validate(req);
    if (error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.status(422).json({ error: message });
    } else {
      next();
    }
  };
};
