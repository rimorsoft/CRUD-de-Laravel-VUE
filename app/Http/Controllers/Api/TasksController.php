<?php

namespace App\Http\Controllers\Api;

use App\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TasksController extends Controller
{
    public function index()
    {
        $tasks = Task::orderBy('id', 'DESC')->paginate(2);

        return [
            'pagination' => [
                'total'        => $tasks->total(),
                'current_page' => $tasks->currentPage(),
                'per_page'     => $tasks->perPage(),
                'last_page'    => $tasks->lastPage(),
                'from'         => $tasks->firstItem(),
                'to'           => $tasks->lastItem(),
            ],
            'tasks' => $tasks
        ];
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'keep' => 'required'
        ]);

        Task::create($request->all());

        return response()->json(['message' => 'La tarea se creo correctamente']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'keep' => 'required',
        ]);

        Task::find($id)->update($request->all());

        return response()->json(['message' => 'La tarea se actualizo correctamente']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $taks = Task::findOrFail($id);
        $taks->delete();

        return response()->json(['message' => 'La tarea se elimino correctamente']);
    }
}
