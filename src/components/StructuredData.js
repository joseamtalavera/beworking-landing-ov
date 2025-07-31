import React from 'react';

export default function StructuredData({ data }) {
    if (!data) return null;
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

