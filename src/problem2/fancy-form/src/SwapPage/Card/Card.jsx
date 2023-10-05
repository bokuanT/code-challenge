/* Source: https://www.material-tailwind.com/docs/react/card*/
import {
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import SettingsButton from "./SettingsButton";
import ConversionInterface from "./ConversionInterface";
import TransactionSummary from "./TransactionSummary";

export default function SimpleCard() {
    return (
        <Card className="relative mt-6 w-120 p-4">
            <SettingsButton />
            <CardBody>
                <ConversionInterface />
            </CardBody>
            <CardFooter className="pt-0">
                <TransactionSummary />
            </CardFooter>
        </Card>
    );
}
