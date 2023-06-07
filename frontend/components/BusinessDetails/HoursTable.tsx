import React from 'react';

interface Props {
    business: {
        hours: {
            Monday: string;
            Tuesday: string;
            Wednesday: string;
            Thursday: string;
            Friday: string;
            Saturday: string;
            Sunday: string;
        };
    };
}


function HoursTable(props : Props) {
    return (
        <table className="w-1/4 border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2">Day</th>
                    <th className="px-4 py-2">Hours</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-200 px-4 py-2">Monday</td>
                    <td className="border border-gray-200 px-4 py-2">
                        {props.business.hours.Monday}
                    </td>
                </tr>
                <tr>
                    <td className="border border-gray-200 px-4 py-2">
                        Tuesday
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                        {props.business.hours.Tuesday}
                    </td>
                </tr>
                <tr>
                    <td className="border border-gray-200 px-4 py-2">
                        Wednesday
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                        {props.business.hours.Wednesday}
                    </td>
                </tr>
                <tr>
                    <td className="border border-gray-200 px-4 py-2">
                        Thursday
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                        {props.business.hours.Thursday}
                    </td>
                </tr>
                <tr>
                    <td className="border border-gray-200 px-4 py-2">Friday</td>
                    <td className="border border-gray-200 px-4 py-2">
                        {props.business.hours.Friday}
                    </td>
                </tr>
                <tr>
                    <td className="border border-gray-200 px-4 py-2">
                        Saturday
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                        {props.business.hours.Saturday}
                    </td>
                </tr>
                <tr>
                    <td className="border border-gray-200 px-4 py-2">Sunday</td>
                    <td className="border border-gray-200 px-4 py-2">
                        {props.business.hours.Sunday}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default HoursTable;
