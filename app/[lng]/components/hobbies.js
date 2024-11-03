import { useTranslation } from "@/app/i18n";
import Image from "next/image";
import React from "react";
import HOBBIES from "@/app/consts/hobbies.json";

function GridCard({ title, description, img_src }) {
    return (
        <div className="card bg-base-100 image-full flex-1 shadow-xl ">
            <figure>
                <Image src={img_src} alt={`${title} image`} loading = "lazy"  fill={true} className="h-full rounded-2xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

function HorizontalDivider() {
    return <div className="divider divider-horizontal" />;
}

function GridRow({ rowCards }) {
    return (
        <div className="flex w-full flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
            {rowCards.map((cardData, index) => (
                <React.Fragment key={cardData.title}>
                    <GridCard {...cardData} />
                    {index < rowCards.length - 1 && <HorizontalDivider />}
                </React.Fragment>
            ))}
        </div>
    );
}

function GridContainer({ data, itemsPerRow = 2 }) {
    const rows = [];
    for (let i = 0; i < data.length; i += itemsPerRow) {
        rows.push(data.slice(i, i + itemsPerRow));
    }

    return rows.map((rowCards, index) => (
                <React.Fragment key={index}>
                    <GridRow rowCards={rowCards} />
                    {index < rows.length - 1 && <div className="divider hidden md:flex" />}
                </React.Fragment>
            )
    );
}

export default async function Hobbies({ lng }) {
    const { t } = await useTranslation(lng, 'hobbies');

    const data = HOBBIES.map(project => ({
        ...project,
        title: t(`${project.name}.title`),
        description: t(`${project.name}.description`),
    }));

    return (
        <div className="h-full snap-center space-y-4 ">
            <GridContainer data={data} itemsPerRow={2} />
        </div>
    );
}
