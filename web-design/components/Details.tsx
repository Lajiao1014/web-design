'use client'

interface DetailsProps {
    guestData: {
        detailTitle: string;
        detailFirstName: string;
        detailLastName: string;
    };
    onChange: (e: { target: { name: string, value: string } }) => void;
}
const Details = ({ guestData, onChange }: DetailsProps) => {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-gray-500 font-medium mb-2">
                    TITLE 尊稱 *
                </label>
                <select
                    name="detailTitle"
                    value={guestData.detailTitle}
                    onChange={onChange}
                    className="w-[550px] bg-neutral-800 text-white p-2 rounded border border-neutral-700 focus:outline-none focus:text-gray-200 hover:bg-neutral-700"
                >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </select>
            </div>
            <div className="flex gap-6">
                <div >
                    <label className=" block text-gray-500 font-medium mb-2">
                        FIRST NAME 名字 *
                    </label>
                    <input
                        type="text"
                        name="detailFirstName"
                        value={guestData.detailFirstName}
                        onChange={onChange}
                        className="w-[550px] bg-neutral-800 text-white p-1 rounded border border-neutral-700 focus:outline-none focus:border-gray-400"
                    />
                </div>
                <div >
                    <label className="block text-gray-500 font-medium mb-2">
                        LAST NAME 姓氏 *
                    </label>
                    <input
                        type="text"
                        name="detailLastName"
                        value={guestData.detailLastName}
                        onChange={onChange}
                        className="w-[550px] bg-neutral-800 text-white p-1 rounded border border-neutral-700 focus:outline-none focus:border-gray-400"
                    />
                </div>
            </div>
        </div>
    );
}

export default Details;