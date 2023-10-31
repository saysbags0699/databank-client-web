'use client'
import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import ProgressLoading from "../components/loading";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <ProgressLoading/>
    )
        
}