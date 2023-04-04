import { debounce } from "lodash";

// =========================== mui ===========================
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, InputBase } from "@mui/material";

// =========================== store ===========================
import { useAppDispatch, useAppSelector } from "../store";
import { productsSelector } from "../app/products/store/products.selectors";
import { ChangeEvent } from "react";
import { setFiltredProducts } from "../app/products/store/products.slice";

// =========================== styled ===========================
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "12ch",
      "&:focus": {
        maxWidth: "20ch",
      },
    },
  },
}));

const SearchComponent = ({ label }: { label: string }) => {
  // ===== hooks =====
  const dispatch = useAppDispatch();

  // ===== selectors =====
  const products = useAppSelector(productsSelector);

  // ===== handlers =====
  const onChangeHandler = debounce(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const filtred = products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      dispatch(setFiltredProducts(filtred));
    },
    300
  );

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={label}
        onChange={(e) => {
          onChangeHandler(e);
        }}
      />
    </Search>
  );
};

export default SearchComponent;
