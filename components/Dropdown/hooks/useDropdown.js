"use client";
import { useState, useEffect } from "react";

export function useDropdown(onToggle) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      onToggle(!isOpen);
    };
  
    const closeDropdown = () => {
      setIsOpen(false);
      onToggle(false);
    };
  
    useEffect(() => {
      const handleScroll = () => {
        if (isOpen) {
          setIsOpen(false);
          onToggle(false);
        }
      };
      if (isOpen) {
        window.addEventListener("scroll", handleScroll);
      }
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isOpen, onToggle]);
  
  return {
    isOpen,
    toggleDropdown, 
    closeDropdown, 
  };
}