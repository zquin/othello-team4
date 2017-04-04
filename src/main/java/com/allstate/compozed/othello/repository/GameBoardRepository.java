package com.allstate.compozed.othello.repository;

import com.allstate.compozed.othello.domain.game.GameBoard;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by localadmin on 4/4/17.
 */
public interface GameBoardRepository extends CrudRepository <GameBoard,Long>{
}
