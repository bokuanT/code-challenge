import React, { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Card, 
    Typography
} from "@material-tailwind/react";

export default function TransactionSummary() {
    const [open, setOpen] = useState(false);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    return (
        <div className="mt-4">
            <>
                <Accordion open={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)}>Transaction summary</AccordionHeader>
                    <AccordionBody>
                        <DefaultTable />
                    </AccordionBody>
                </Accordion>
            </>
        </div>
    );
};

function DefaultTable() {
    return (
      <Card className="h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <tbody>
            <tr>
                <td>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        Network fee
                    </Typography>
                </td>
                <td>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        $1
                    </Typography>
                </td>
            </tr>
            <tr>
                <td>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        Price Impact
                    </Typography>
                </td>
                <td>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        -0.613%
                    </Typography>
                </td>
            </tr>
            <tr>
                <td>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        Minimum output
                    </Typography>
                </td>
                <td>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        0.000869 USDT
                    </Typography>
                </td>
            </tr>
            <tr>
                <td>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        Expected output
                    </Typography>
                </td>
                <td>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        0.000913 USDT
                    </Typography>
                </td>
            </tr>
          </tbody>
        </table>
      </Card>
    );
}