import React from 'react';

interface EmptyStateProps {
    icon?: string;
    title: string;
    description: string;
    action?: React.ReactNode;
}

export default function EmptyState({
    icon = '📦',
    title,
    description,
    action
}: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>
            {action && <div className="flex justify-center">{action}</div>}
        </div>
    );
}