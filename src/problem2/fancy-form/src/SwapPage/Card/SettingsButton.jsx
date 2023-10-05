import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function SettingsButton() {
    return (
        <IconButton variant="text" color="blue-gray">
            <Cog6ToothIcon className="h-4 w-4" />
        </IconButton>
    );
}

