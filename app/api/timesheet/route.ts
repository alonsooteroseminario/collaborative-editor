import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const timeSheetData = await request.json();
    
    const newTimeSheet = await prisma.timeSheet.create({
      data: timeSheetData,
    });

    return NextResponse.json(newTimeSheet, { status: 201 });
  } catch (error) {
    console.error('Error creating time sheet:', error);
    return NextResponse.json(
      { error: 'Error creating time sheet' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const timeSheets = await prisma.timeSheet.findMany();
    return NextResponse.json(timeSheets);
  } catch (error) {
    console.error('Error fetching time sheets:', error);
    return NextResponse.json(
      { error: 'Error fetching time sheets' },
      { status: 500 }
    );
  }
}