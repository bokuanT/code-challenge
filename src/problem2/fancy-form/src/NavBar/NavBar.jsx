/* Source: https://www.material-tailwind.com/docs/react/navbar */
import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";

const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Swap
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Tokens
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          NFTs
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Pools
        </a>
      </Typography>
    </ul>
);
  
export default function NavbarDefault() {
return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-3">
    <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
        <Typography
        as="a"
        href="/"
        variant="h6"
        className="mr-4 ml-2 cursor-pointer py-1.5"
        >
        Fancy Form
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="ml-auto flex gap-1 md:mr-4">
        <IconButton variant="text" color="blue-gray">
            <BellIcon className="h-4 w-4" />
        </IconButton>
        </div>
        <div className="relative flex w-full gap-2 md:w-max">
        <Input
            type="search"
            label="Type here..."
            className="pr-20"
            containerProps={{
            className: "min-w-[288px]",
            }}
        />
        <Button size="sm" className="!absolute right-1 top-1 rounded">
            Search
        </Button>
        </div>
    </div>
    </Navbar>
);
}
