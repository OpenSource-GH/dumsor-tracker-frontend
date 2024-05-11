"use client";

import React from "react";
import { Button } from "./button";
import Link from "next/link";

function EditButton({ id }: { id: string }) {
  return (
    <Link href={`/logs/update/${id}`}>
      <div className="my-5">
        <Button variant={`default`}>Edit</Button>
      </div>
    </Link>
  );
}

export default EditButton;
