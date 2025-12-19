"use client";
import React, { type ReactNode } from "react";
import { IoClose } from "react-icons/io5";

type CustomModalProps = {
    open: boolean;
    openHandler?: () => void;
    children?: ReactNode;
    title?: string;
    onSubmit?: (e: React.FormEvent) => void;
    loading?: boolean;
    submitButtonText?: string;
    submitButtonLoadingText?: string;
    size?: "small" | "large";
};

const CustomModal = ({
    open,
    openHandler,
    children,
    title,
    onSubmit,
    loading = false,
    submitButtonText,
    submitButtonLoadingText,
    size = "small"
}: CustomModalProps) => {
    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <div className="modal-overlay" onClick={openHandler}>
            <div className={`modal-content ${size === "small" ? "max-w-md" : "max-w-lg"}`} onClick={(e) => e.stopPropagation()}>
                <IoClose
                    onClick={openHandler}
                    className="modal-close-button"
                />

                {onSubmit ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {title && <h1 className="heading">{title}</h1>}
                        {children}
                        {submitButtonText && (
                            <div>
                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={loading}
                                >
                                    {loading
                                        ? submitButtonLoadingText
                                        : submitButtonText}
                                </button>
                            </div>
                        )}
                    </form>
                ) : (
                    <>
                        {title && <h1 className="heading">{title}</h1>}
                        {children}
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(CustomModal);
