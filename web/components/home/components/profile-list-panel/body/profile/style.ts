import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    backgroundColor: (props: { isSelected: Boolean }) => {
      const { isSelected } = props;
      if (isSelected) {
        return theme.palette.grey[200];
      } else return theme.palette.background.paper;
    },
  },
  listItemAvatar: {
    width: "40px",
    height: "40px",
  },
  listItemTextHeaderBox: {
    display: "flex",
  },
  listItemTextHeader: {
    flex: 1,
  },
  listItemTextBodyBox: { display: "flex", color: theme.palette.text.secondary },
  listItemTextBody: {
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100px",
    textOverflow: "ellipsis",
  },
}));
